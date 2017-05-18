var ret;
var env = "dev";
var dev = {
    server: 'http://localhost:3002',
    mqttserver: 'mqtt://localhost:3002'
};
var prod = {
    server: 'http://139.196.179.234:3000',
    mqttserver: 'mqtt://139.196.179.234:3000'
};

if (env == 'prod') {
    ret = prod;
} else {
    ret = dev;
}

export const Config: any = ret;