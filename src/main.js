import Vue from 'vue'

const app = new Vue({
    el: '#juice-app',
    data: {
        name: '',
        batchSize: 10,
        pgPercent: 30,
        vgPercent: 70,
        nic: 30,
        targetNic: 3,
        flavoursRaw: []
    },
    methods: {
        roundTwo(val) {
            return Math.round(val * 100) / 100;
        }
    },
    watch: {
        pgPercent(val) {
            this.vgPercent = 100 - val;
        },
        vgPercent(val) {
            this.pgPercent = 100 - val;
        }
    },
    computed: {
        totalBasePg() {
            let base = this.pgNicVol;
            this.flavours.forEach(f => {
                base += f.vol;
            });

            return base;
        },
        flavours() {
            return this.flavoursRaw.map(f => {
                f.vol = (f.perc / 100) * this.batchSize;
                return f;
            });
        },
        pgNicVol() {
            return this.roundTwo((this.targetNic / this.nic) * this.batchSize);
        },
        pgNicPerc() {
            return this.roundTwo((this.pgNicVol / this.batchSize) * 100);
        },
        pgZeroVol() {
            return this.roundTwo((this.batchSize * (this.pgPercent / 100)) - this.totalBasePg);
        },
        pgZeroPerc() {
            return this.roundTwo((this.pgZeroVol / this.batchSize) * 100);
        },
        vgVol() {
            return this.roundTwo((this.vgPercent / 100) * this.batchSize);
        },
        vgPerc() {
            return this.roundTwo((this.vgVol / this.batchSize) * 100);
        }
    }
});
