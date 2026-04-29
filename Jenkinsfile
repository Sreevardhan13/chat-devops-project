pipeline {
    agent any

    stages {

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
        withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
            sh '''
            echo $PASS | docker login -u $USER --password-stdin
            docker push Sreevardhan13/chat-devops-project
            '''
        }
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