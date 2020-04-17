resource "cloudflare_record" "mailmask-mta-a" {
  zone_id = "${var.cloudflare_zone_id}"
  name    = "${var.subdomain}.${var.domain}"
  value   = "${digitalocean_floating_ip.mailmask-mta.ip_address}"
  type    = "A"
  ttl     = 3600
}


resource "cloudflare_record" "mailmask-mta-mx" {
  zone_id = "${var.cloudflare_zone_id}"
  name    = "*"
  value   = "${var.subdomain}.${var.domain}"
  type    = "MX"
  priority = 0
}


