stage('build') {
    node {
        checkout scm
        sh 'npm install'
        sh 'npm run ng build'
        sh 'mv dist/* /srv/shine/'
    }
}
