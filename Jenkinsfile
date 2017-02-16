stage('build') {
    node {
        checkout scm
        sh 'npm install'
        sh 'npm run ng build'
        archive 'dist/**'
    }
}

stage('deploy') {
    node {
        dir('/srv/shine') {
            unarchive
        }
    }
}
