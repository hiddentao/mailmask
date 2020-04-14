resource "digitalocean_floating_ip" "camomail-mta" {
    droplet_id = digitalocean_droplet.camomail-mta.id
    region = digitalocean_droplet.camomail-mta.region
}
