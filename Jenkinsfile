pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/sreevardhan13/chat-devops-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t chat-app .'
            }
        }

        stage('Tag Image') {
            steps {
                sh 'docker tag chat-app sreevardhan132/chat-app'
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh 'docker push sreevardhan132/chat-app'
            }
        }

        stage('Deploy with Terraform') {
            steps {
                sh '''
                cd terraform
                terraform init
                terraform apply -auto-approve
                '''
            }
        }
    }
}