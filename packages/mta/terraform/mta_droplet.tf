resource "digitalocean_droplet" "camomail-mta" {
    backups              = false
    image                = "ubuntu-18-04-x64"
    ipv6                 = true
    monitoring           = true
    name                 = "camomail-mta"
    private_networking   = true
    ssh_keys             = [
        "${var.ssh_fingerprint}"
    ]
    region               = "lon1"
    resize_disk          = true
    size                 = "s-1vcpu-1gb"
    tags                 = [ "camomail-mta" ]

    # for blue-green deployments
    lifecycle {
        create_before_destroy = true
    }

    connection {
        host = "${digitalocean_droplet.camomail-mta.ipv4_address}"
        user = "root"
        type = "ssh"
        private_key = "${file(var.pvt_key)}"
        timeout = "2m"
    }

    // base init
    provisioner "remote-exec" {
        inline = [
            "sleep 60", # wait for network and OS to be initialized properly
            "export PATH=$PATH:/usr/bin",
        ]
    }

    // setup swapfile
    provisioner "remote-exec" {
        inline = [
            "sudo fallocate -l 4G /swapfile",
            "sudo chmod 600 /swapfile",
            "sudo mkswap /swapfile",
            "sudo swapon /swapfile",
            "sudo echo \"/swapfile swap swap defaults 0 0\" >> /etc/fstab"
        ]
    }

    // install base deps
    provisioner "remote-exec" {
        inline = [
            "sudo apt update",
            "sudo apt install -y software-properties-common python3-pip",
        ]
    }

    // install docker
    provisioner "remote-exec" {
        inline = [
            "sudo apt -y install apt-transport-https ca-certificates curl gnupg-agent",
            "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -",
            "sudo add-apt-repository \"deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\"",
            "sudo apt -y install docker-ce docker-ce-cli containerd.io",
            "sudo systemctl enable docker",
        ]
    }

    // clean out old docker images (so that docker build is fast)
    provisioner "local-exec" {
        command = "rm -f mta-docker-image*"
        working_dir = "${path.root}/.."
    }

    // build docker image
    provisioner "local-exec" {
        command = "docker build --build-arg NPM_TOKEN=$NPM_TOKEN --tag camomail-mta:latest ."
        working_dir = "${path.root}/.."
    }

    // save docker image
    provisioner "local-exec" {
        command = "docker save camomail-mta:latest -o mta-docker-image.tar"
        working_dir = ".."
    }

    // zip docker image
    provisioner "local-exec" {
        command = "gzip -9 -f mta-docker-image.tar"
        working_dir = "${path.root}/.."
    }

    // transfer docker image
    provisioner "file" {
        source      = "../mta-docker-image.tar.gz"
        destination = "/root/mta-docker-image.tar.gz"
    }

    // import docker image on remote host
    provisioner "remote-exec" {
        inline = [
            "docker load -i /root/mta-docker-image.tar.gz"
        ]
    }

    // start mta docker container
    provisioner "remote-exec" {
        inline = [
            <<EOF
                docker run \
                --restart unless-stopped \
                --publish 25:50025 \
                --env APP_MODE=live \
                --env NODE_ENV=production \
                --env TRACE_CONSOLE_ENABLED=false \
                --env TRACE_CLOUD_ENABLED=true \
                --env TRACE_CLOUD_ENDPOINT=${var.trace_cloud_endpoint} \
                --env DB_HOST=${var.db_host} \
                --env DB_PORT=${var.db_port} \
                --env DB_USERNAME=${var.db_username} \
                --env DB_PASSWORD=${var.db_password} \
                --env MAILGUN_API_KEY=${var.mailgun_api_key} \
                --detach \
                camomail-mta \
                camomail-mta:latest
            EOF
        ]
    }

    // setup firewall
    provisioner "remote-exec" {
        inline = [
            "echo y | sudo ufw enable",
            "sudo ufw allow 22",
            "sudo ufw allow 8302",
            "sudo ufw allow 8303",
        ]
    }
}

resource "digitalocean_project" "camomail" {
    name        = "camomail"
    description = "Camomail services"
    resources = [
        "${digitalocean_droplet.camomail-mta.urn}"
    ]
}
