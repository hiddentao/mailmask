variable "do_token" {}
variable "pub_key" {}
variable "pvt_key" {}
variable "ssh_fingerprint" {}
variable "trace_cloud_endpoint" {}
variable "cloudflare_email" {}
variable "cloudflare_api_key" {}
variable "cloudflare_zone_id" {
  default = "2b14b9955f8a79e069ac86ff657e36fa"
}
variable "domain" {
  default = "msk.sh"
}
variable "subdomain" {
  default = "mail"
}
variable "db_host" {}
variable "db_port" {}
variable "db_username" {}
variable "db_password" {}
variable "mailer_api_key" {}


provider "digitalocean" {
  token   = "${var.do_token}"
  version = "1.9.1"
}

provider "cloudflare" {
  version = "~> 2.0"
  email = "${var.cloudflare_email}"
  api_key = "${var.cloudflare_api_key}"
}
