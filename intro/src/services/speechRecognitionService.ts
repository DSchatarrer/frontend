// src\utils\speechRecognitionUtil.ts

// Declarar la clase SpeechRecognition para que TypeScript la reconozca
declare class SpeechRecognition {
    lang: string;
    start(): void;
    stop(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

// Define la interfaz de los eventos de SpeechRecognition
interface SpeechRecognitionEvent {
    results: { [key: number]: { [key: number]: { transcript: string } } };
}

interface SpeechRecognitionErrorEvent {
    error: string;
    message: string;
    type: string;
}

// Clase SpeechRecognition encapsulada
class SpeechRecognitionHandler {
    recognition: SpeechRecognition | undefined;
    isRecording: boolean = false;

    constructor(private language: string = 'es-ES') {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Su navegador no soporta el reconocimiento de voz.');
            return;
        }

        // Configuración de la instancia de reconocimiento de voz
        const SpeechRecognitionClass = window.webkitSpeechRecognition as typeof SpeechRecognition;
        this.recognition = new SpeechRecognitionClass();
        this.recognition.lang = this.language;
    }

    start(onResult: (transcript: string) => void, onError: (error: string) => void) {
        if (!this.recognition) return;

        this.isRecording = true;  // Actualiza el estado de grabación
        this.recognition.start();

        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            this.stop();  // Detiene el reconocimiento después de obtener el resultado
        };

        this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            onError(`Error: ${event.error}, Message: ${event.message}`);
            this.stop();  // Detiene el reconocimiento en caso de error
        };
    }

    stop() {
        if (!this.recognition) return;
        this.recognition.stop();
        this.isRecording = false;  // Actualiza el estado de grabación
    }
}

export default SpeechRecognitionHandler;
