export class textToSpeech{
    speechSynthesis: SpeechSynthesis;

    constructor() {
        this.speechSynthesis = window.speechSynthesis;
    }

    async speakText(Text:string) {
        const utterance = new SpeechSynthesisUtterance(Text);
        utterance.rate = 1.6;
        const voices = this.speechSynthesis.getVoices();
        utterance.voice = voices[1];
        await this.speechSynthesis.speak(utterance);
    }
}