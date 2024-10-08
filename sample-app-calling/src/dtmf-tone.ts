declare global {
	interface Window {
		webkitAudioContext: typeof AudioContext;
	}
}

const dtmfFrequencies: { [key: string]: [number, number] } = {
	"1": [697, 1209],
	"2": [697, 1336],
	"3": [697, 1477],
	"4": [770, 1209],
	"5": [770, 1336],
	"6": [770, 1477],
	"7": [852, 1209],
	"8": [852, 1336],
	"9": [852, 1477],
	"*": [941, 1209],
	"0": [941, 1336],
	"#": [941, 1477],
	A: [697, 1633],
	B: [770, 1633],
	C: [852, 1633],
	D: [941, 1633],
};

export function playDtmfTone(key: string, duration: number): void {
	if (!(key in dtmfFrequencies)) {
		console.error("Invalid DTMF key");
		return;
	}

	// Create an audio context
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();

	// Create two oscillators for the two frequencies
	const [freq1, freq2] = dtmfFrequencies[key];
	const oscillator1 = audioContext.createOscillator();
	const oscillator2 = audioContext.createOscillator();

	oscillator1.frequency.setValueAtTime(freq1, audioContext.currentTime);
	oscillator2.frequency.setValueAtTime(freq2, audioContext.currentTime);

	// Create a gain node to control the volume
	const gainNode = audioContext.createGain();
	gainNode.gain.setValueAtTime(1, audioContext.currentTime);

	// Connect the oscillators to the gain node and then to the audio context's destination
	oscillator1.connect(gainNode);
	oscillator2.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Start the oscillators
	oscillator1.start();
	oscillator2.start();

	// Stop the oscillators after the specified duration
	setTimeout(() => {
		oscillator1.stop();
		oscillator2.stop();
		audioContext.close();
	}, duration);
}
