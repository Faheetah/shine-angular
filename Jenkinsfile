stage('build') {
    node {
        checkout scm
        sh 'npm install'
        sh 'npm run ng build'
        sh "rsync -av --delete-after dist/ /srv/shine/${env.BRANCH_NAME}/"
        echo "http://${env.BRANCH_NAME}.shine.sudovim.com"
    }
}
