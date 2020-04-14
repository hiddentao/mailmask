resource "digitalocean_firewall" "do_firewall" {
    name  = "camomail-mta"
    tags  = [ "camomail-mta" ]
    count = "1"

    inbound_rule {
        port_range                = "25"
        protocol                  = "tcp"
        source_addresses          = [
            "0.0.0.0/0",
            "::/0",
        ]
    }

    inbound_rule {
        port_range                = "22"
        protocol                  = "tcp"
        source_addresses          = [
            "0.0.0.0/0",
            "::/0",
        ]
    }

    outbound_rule {
        destination_addresses          = [
            "0.0.0.0/0",
            "::/0",
        ]
        protocol                       = "icmp"
    }

    outbound_rule {
        destination_addresses          = [
            "0.0.0.0/0",
            "::/0",
        ]
        port_range                     = "all"
        protocol                       = "tcp"
    }
    outbound_rule {
        destination_addresses          = [
            "0.0.0.0/0",
            "::/0",
        ]
        port_range                     = "all"
        protocol                       = "udp"
    }
}