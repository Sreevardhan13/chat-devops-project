provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "chat_server" {
  ami = "ami-0c02fb55956c7d316"   
  instance_type = "t3.micro"

  key_name = "erna-key"

  # 👇 Use default security group (no permission needed)
  security_groups = ["default"]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras install docker -y
              service docker start
              usermod -a -G docker ec2-user

              docker pull sreevardhan132/chat-app:latest
              docker run -d -p 3000:3000 sreevardhan132/chat-app:latest
              EOF

  tags = {
    Name = "ChatAppServer"
  }
}