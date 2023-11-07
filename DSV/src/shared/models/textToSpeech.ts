export class textToSpeech{
    speechSynthesis: SpeechSynthesis;

    constructor() {
        this.speechSynthesis = window.speechSynthesis;
    }

    async speakText(Text:string) {
        const utterance = new SpeechSynthesisUtterance(Text);
        utterance.rate = 1;
        utterance.lang = "en-US"
        const voices = this.speechSynthesis.getVoices().filter(voice => voice.lang === "en-US");
        console.log(voices);
        if(voices.length < 24)
            utterance.voice = voices[1];
        else
            utterance.voice = voices[24];
        await this.speechSynthesis.speak(utterance);
    }
}