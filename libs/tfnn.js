class TFNeuralNetwork {

    constructor(a, b, c) {
        this.input_nodes = a;
        this.hidden_nodes = b;
        this.output_nodes = c;

        this.createModel();
    }

    predict(inputs) {
        const xs = tf.tensor2d([inputs]);
        const ys = this.model.predict(xs);
        const output = ys.dataSync();
        return output;
    }
     
    copy() {
        const modelCopy = this.createModel();
    }
    
    createModel() {
        this.model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid'
        });
        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: 'softmax'
        });
        
        this.model.add(hidden);
        this.model.add(output);
    }
}