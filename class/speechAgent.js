class SpeechAgent {
    constructor() {
        this.classifier;
        this.label = 'listening...';
        this.soundModel = 'http://127.0.0.1:5500/model/';
        this.classifier = ml5.soundClassifier(this.soundModel + 'model.json');
        this.initializeClassifier();
    }

    initializeClassifier() {
        this.classifier.classify(this.gotResult);
    }

    gotResult(error, results) {
        if (error) {
            console.error(error);
        } else {
            let label = results[0]['label'];
            let selected = 0;
            for (var i = 0; i < results.length; i++) {
                if (results[i]['confidence'] > results[selected]['confidence']) {
                    selected = i;
                    label = results[i]['label'];
                }
            }

            console.log(label);
            if (selected > -1) {

                if (label == "Initialize") {
                    initialize();
                }

                if (label == "Terminate") {
                    terminate();
                }

                if (label == "Move Up") {
                    if (epicenter.y > 50) {
                        epicenter.add(0, -50);
                    }
                }

                if (label == "Move Down") {

                    if (epicenter.y < height - 50) {
                        epicenter.add(0, 50);
                    }

                }

                if (label == "Move Left") {
                    if (epicenter.x > 50) {
                        epicenter.add(-50, 0);
                    }
                }

                if (label == "Move Right") {
                    if (epicenter.x < width - 50) {
                        epicenter.add(50, 0);
                    }
                }

                if (label == "Image") {
                    terminate();
                    var imageid = randomIntFromInterval(1, 3)
                    imagemode("img/img_" + imageid + ".jpg");
                }

                if (label == "Jumpscare") {
                    is_jumpscare = true;
                }


                


            }
        }
    }

}