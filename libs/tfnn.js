class TFNeuralNetwork {

    constructor(a, b, c, d) {

        if (a instanceof tf.Sequential) {
            this.model = a;
            this.input_nodes = b;
            this.hidden_nodes = c;
            this.output_nodes = d;
        } else {
            this.input_nodes = a;
            this.hidden_nodes = b;
            this.output_nodes = c;
            this.model = this.createModel();
        }
    }

    predict(inputs) {
        return tf.tidy( () => {
            const xs = tf.tensor2d([inputs]);
            const ys = this.model.predict(xs);
            const output = ys.dataSync();
            return output;
        });
    }
     
    copy() {
        
        return tf.tidy( () => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            
            const weightCopies = [];
            for (let i = 0; i < weights.length; i++) {
                weightCopies[i] = weights[i].clone();
            }
            
            modelCopy.setWeights(weightCopies);
            
            return new TFNeuralNetwork(modelCopy, 
                this.input_nodes, 
                this.hidden_nodes, 
                this.output_nodes);
        });
        
    }
    

    createModel() {
        const model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid'
        });
        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: 'softmax'
        });
        
        model.add(hidden);
        model.add(output);

        return model;
    }

    mutate(rate) {
        
        tf.tidy( () => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
    
            for (let i = 0; i < weights.length; i++) {
    
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
    
                for (let j = 0; j < values.length; j++) {
                    if (random(1) < rate) {
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }

    dispose() {
        this.model.dispose();
    }
}