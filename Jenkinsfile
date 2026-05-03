pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build --no-cache -t chat-app .'
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
                    docker push sreevardhan132/chat-app
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop $(docker ps -q --filter ancestor=sreevardhan132/chat-app) || true
                docker rm $(docker ps -aq --filter ancestor=sreevardhan132/chat-app) || true
                docker pull sreevardhan132/chat-app:latest
                docker run -d -p 3000:3000 sreevardhan132/chat-app:latest
                '''
            }
        }
    }
}
