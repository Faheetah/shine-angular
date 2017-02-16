stage('build') {
    node {
        checkout scm
        sh 'npm install'
        sh 'ng build'
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
