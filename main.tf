provider "aws" {
  region = "us-east-1"
}
resource "aws_security_group" "SG-SnakeWebApp" {
name        = "SG-SnakeWebApp"
description = "Security group para permitir SSH y HTTP"
ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
}
ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks =["0.0.0.0/0"]
}
egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks =["0.0.0.0/0"]

}
}

resource "aws_instance" "web_server" {
  ami           = "ami-005fc0f236362e99f"  # AMI de Ubuntu, revisa la más reciente.
  key_name = "instancia"
  security_groups = [aws_security_group.SG-SnakeWebApp.name]
  instance_type = "t2.micro"
  user_data = <<-EOF
    #!/bin/bash
    sudo apt-get update -y
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
    # Descargar y ejecutar el contenedor Docker
    docker run -dit -p 80:5000 -it santiagorestrepo14/snake-web-app
  EOF

  tags = {
    Name = "Terraform-Snake-Web-EC2"
  }
}

output "instance_ip" {
  value = aws_instance.web_server.public_ip
}
