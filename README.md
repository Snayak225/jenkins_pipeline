# Demo pipeline 1

pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}

----
# Demo pipeline 2
pipeline {
    agent any
    stages {
        stage('Docker Run') {
            agent any
            steps {
                sh 'docker run -d -p 80:80 rancher/hello-world'
                }
            }
        }
    }

----
# Demo Pipeline 3

pipeline {
    agent any
    stages {
        stage('Docker Build') {
            steps {
                sh 'docker build -f containerfile -t snayak225/frontend:jen .'
            }
        }
        stage('Docker Push') {
            agent any
            steps {
                withCredentials([usernamePassword(credentialsId: '0150dc95-cb80-4e33-82bf-18b5e8ddb736', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                    sh "docker login docker.io -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                    sh 'docker push snayak225/frontend:jen'
                }
            }
        }
        stage('Docker Run') {
            agent any
            steps {
                sh 'docker run -d -p 12001:12000 snayak225/frontend:jen'
                sh 'docker run -d -p 12002:12000 snayak225/frontend:jen'
                }
            }
        }
    }
