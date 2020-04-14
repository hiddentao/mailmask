resource "cloudflare_record" "camomail-mta-a" {
  zone_id = "${var.cloudflare_zone_id}"
  name    = "${var.subdomain}.${var.domain}"
  value   = "${digitalocean_floating_ip.camomail-mta.ip_address}"
  type    = "A"
  ttl     = 3600
}


resource "cloudflare_record" "camomail-mta-mx" {
  zone_id = "${var.cloudflare_zone_id}"
  name    = "*"
  value   = "${var.subdomain}.${var.domain}"
  type    = "MX"
  priority = 0
}


