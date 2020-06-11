// const exampleImage = 'https://tesseract.projectnaptha.com/img/eng_bw.png';

// const worker = Tesseract.createWorker({
//     logger: m => console.log(m)
// });

// Tesseract.setLogging(true);

// work();

// async function work() {
//     await worker.load();
//     await worker.loadLanguage('eng');
//     await worker.initialize('eng');

//     console.log('Before Detect')

//     let result = await worker.detect(exampleImage);
//     console.log(result.data);

//     result = await worker.recognize(exampleImage);
//     console.log(result.data);

//     await worker.terminate();
// }

const sampleImgBtn = document.querySelector('.sample-btn');
const sampleImg = '/img/eng_bw.png';

// Event Listners
sampleImgBtn.addEventListener('click', () => {
    console.log('SampleImgBtn Clicked');
    recognizeFile(sampleImg);
})


function progressUpdate(packet) {
    const log = document.getElementById('log');

    if (log.firstChild && log.firstChild.status === packet.status) {
        if ('progress' in packet) {
            const progress = log.firstChild.querySelector('progress')
            progress.value = packet.progress
        }
    } else {
        const line = document.createElement('div');
        line.status = packet.status;
        const status = document.createElement('div')
        status.className = 'status'
        status.appendChild(document.createTextNode(packet.status))
        line.appendChild(status)

        if ('progress' in packet) {
            const progress = document.createElement('progress')
            progress.value = packet.progress
            progress.max = 1
            line.appendChild(progress)
        }


        if (packet.status == 'done') {
            const pre = document.createElement('pre')
            pre.appendChild(document.createTextNode(packet.data.data.text))
            line.innerHTML = ''
            line.appendChild(pre)

        }

        log.insertBefore(line, log.firstChild)
    }
}

async function recognizeFile(file) {
    console.log('Begin Reco');
    document.querySelector("#log").innerHTML = ''

    const lang = document.querySelector('#lang-select').value
    console.log('lang in fileReco', lang);
    const data = await Tesseract.recognize(file, lang, {
        // corePath,
        logger: progressUpdate,
    });
    progressUpdate({
        status: 'done',
        data
    });
}