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
                CONTAINER_ID=$(docker ps -q --filter ancestor=sreevardhan132/chat-app)

                if [ ! -z "$CONTAINER_ID" ]; then
                    docker stop $CONTAINER_ID
                    docker rm $CONTAINER_ID
                fi

                docker pull sreevardhan132/chat-app:latest
                docker run -d -p 3000:3000 sreevardhan132/chat-app:latest
                '''
            }
        }
    }
}
