resource "digitalocean_floating_ip" "mailmask-mta" {
    droplet_id = digitalocean_droplet.mailmask-mta.id
    region = digitalocean_droplet.mailmask-mta.region
}
