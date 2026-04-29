pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/Sreevardhan13/chat-devops-project'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t chat-app .'
            }
        }

        stage('Tag Image') {
            steps {
                sh 'docker tag chat-app Sreevardhan13/chat-devops-project'
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh 'docker push Sreevardhan13/chat-devops-project'
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