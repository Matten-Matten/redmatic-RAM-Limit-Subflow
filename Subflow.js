[
    {
        "id": "64cc7bda.c3b164",
        "type": "subflow",
        "name": "RAM Limit",
        "info": "---\n# Redmatic Ramlimit ändern\n\n`Version 0.2.0`\n\n---\n# Wert holen\n`msg.topic = \"read_limit\"`\n\n`msg.payload = egal`\n\n\n---\n\n# Wert schreiben\n`msg.topic = \"set_limit\"`\n\n`msg.payload = 300 (Zahl)`\n\n\n---\n# monit reload\n`msg.topic = \"monit_reload\"`\n\n`msg.payload = egal`\n\n---\n\n_by Matten Matten_",
        "category": "redmatic",
        "in": [
            {
                "x": 40,
                "y": 360,
                "wires": [
                    {
                        "id": "4d76c005.4583e"
                    }
                ]
            }
        ],
        "out": [],
        "env": [
            {
                "name": "",
                "type": "str",
                "value": "Version",
                "ui": {
                    "icon": "font-awesome/fa-home",
                    "label": {
                        "en-US": "Version: 0.2.0"
                    },
                    "type": "none"
                }
            },
            {
                "name": "LIMIT",
                "type": "num",
                "value": "250",
                "ui": {
                    "icon": "font-awesome/fa-database",
                    "label": {
                        "en-US": "Ram Limit"
                    },
                    "type": "spinner",
                    "opts": {
                        "min": 250,
                        "max": 1500
                    }
                }
            },
            {
                "name": "DEBUG",
                "type": "bool",
                "value": "false",
                "ui": {
                    "icon": "font-awesome/fa-bug",
                    "label": {
                        "en-US": "Debug"
                    },
                    "type": "checkbox"
                }
            },
            {
                "name": "",
                "type": "str",
                "value": "leer",
                "ui": {
                    "type": "none"
                }
            },
            {
                "name": "",
                "type": "str",
                "value": "matten",
                "ui": {
                    "icon": "font-awesome/fa-pencil",
                    "label": {
                        "en-US": "by Matten Matten"
                    },
                    "type": "none"
                }
            }
        ],
        "color": "#3FADF0",
        "inputLabels": [
            "Set Ram / Check Ram / monit reload"
        ],
        "icon": "node-red/leveldb.png",
        "status": {
            "x": 1260,
            "y": 300,
            "wires": [
                {
                    "id": "c866a685.58e9a8",
                    "port": 0
                }
            ]
        }
    },
    {
        "id": "13bdcf21.4f6a21",
        "type": "exec",
        "z": "64cc7bda.c3b164",
        "command": "/usr/bin/monit reload",
        "addpay": true,
        "append": "",
        "useSpawn": "true",
        "timer": "",
        "oldrc": false,
        "name": "",
        "x": 540,
        "y": 140,
        "wires": [
            [
                "bdb51c6a.dcb31",
                "b1652d8a.9944c"
            ],
            [],
            [
                "ac924a11.a7e818"
            ]
        ]
    },
    {
        "id": "e7057033.13eea",
        "type": "debug",
        "z": "64cc7bda.c3b164",
        "name": "RAM Limit Debug",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 1150,
        "y": 60,
        "wires": []
    },
    {
        "id": "5b435cb4.1503b4",
        "type": "comment",
        "z": "64cc7bda.c3b164",
        "name": "Ram limit",
        "info": "",
        "x": 80,
        "y": 20,
        "wires": []
    },
    {
        "id": "73542f27.33906",
        "type": "inject",
        "z": "64cc7bda.c3b164",
        "name": "push",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": true,
        "onceDelay": "1",
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 90,
        "y": 300,
        "wires": [
            [
                "ad58530a.f110c"
            ]
        ]
    },
    {
        "id": "ad58530a.f110c",
        "type": "file in",
        "z": "64cc7bda.c3b164",
        "name": "",
        "filename": "/usr/local/addons/redmatic/etc/monit.cfg",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "x": 580,
        "y": 300,
        "wires": [
            [
                "f0c18e03.c5de4"
            ]
        ]
    },
    {
        "id": "23481ffb.64d1d",
        "type": "file",
        "z": "64cc7bda.c3b164",
        "name": "",
        "filename": "/usr/local/addons/redmatic/etc/monit.cfg",
        "appendNewline": false,
        "createDir": false,
        "overwriteFile": "true",
        "encoding": "none",
        "x": 1040,
        "y": 480,
        "wires": [
            [
                "4685ff1c.60cba"
            ]
        ]
    },
    {
        "id": "706cf3f6.eade9c",
        "type": "template",
        "z": "64cc7bda.c3b164",
        "name": "",
        "field": "payload",
        "fieldType": "msg",
        "format": "handlebars",
        "syntax": "mustache",
        "template": "CHECK PROCESS redmatic-nodered MATCHING '^node-red\\s*$|red\\.js'\n    GROUP redmatic\n    MODE PASSIVE\n    ONREBOOT NOSTART\n\n    start = \"/etc/config/rc.d/redmatic start\"\n    restart = \"/etc/config/rc.d/redmatic restart\"\n    stop = \"/etc/config/rc.d/redmatic stop\"\n\n    if memory usage > {{LIMIT}} MB then alert\n    if cpu > 90% for 2 cycles then alert\n    if disk write rate > 1 MB/s for 2 cycles then alert\n    if failed\n        host localhost\n        port 1880\n        protocol http\n        request \"/addons/red/\"\n    then alert\n\nCHECK PROGRAM redmatic-diskusage with path \"/usr/local/addons/redmatic/bin/monit-du 710\"\n    GROUP redmatic\n    MODE PASSIVE\n    ONREBOOT NOSTART\n    every \"23 3 * * *\"\n    if status != 0 then alert",
        "output": "str",
        "x": 800,
        "y": 480,
        "wires": [
            [
                "23481ffb.64d1d"
            ]
        ]
    },
    {
        "id": "81764ab2.a63bf8",
        "type": "debug",
        "z": "64cc7bda.c3b164",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 1130,
        "y": 220,
        "wires": []
    },
    {
        "id": "f0c18e03.c5de4",
        "type": "function",
        "z": "64cc7bda.c3b164",
        "name": "",
        "func": "msg.payload = msg.payload.split(\"\\n\");\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 300,
        "y": 260,
        "wires": [
            [
                "177a0ece.846b21"
            ]
        ]
    },
    {
        "id": "177a0ece.846b21",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "if memory usage",
        "property": "payload[9]",
        "propertyType": "msg",
        "rules": [
            {
                "t": "cont",
                "v": "if memory usage",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 1,
        "x": 510,
        "y": 260,
        "wires": [
            [
                "f9b0ca3c.1cc188"
            ]
        ]
    },
    {
        "id": "f9b0ca3c.1cc188",
        "type": "function",
        "z": "64cc7bda.c3b164",
        "name": "read RAM",
        "func": "var antwort = msg.payload[9];\n\nvar RAM = antwort.slice(((antwort.indexOf('> ') + 3) - 1), antwort.lastIndexOf(' MB'));\nmsg.payload = parseFloat(RAM);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 680,
        "y": 260,
        "wires": [
            [
                "acbfc0c6.219ac",
                "cabea144.d219d8"
            ]
        ]
    },
    {
        "id": "17b58bf3.e6bb24",
        "type": "debug",
        "z": "64cc7bda.c3b164",
        "name": "max RAM",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 1040,
        "y": 260,
        "wires": []
    },
    {
        "id": "bf0874a2.5b7c58",
        "type": "comment",
        "z": "64cc7bda.c3b164",
        "name": "Limit setzen",
        "info": "",
        "x": 810,
        "y": 440,
        "wires": []
    },
    {
        "id": "55ebd7fb.570dd8",
        "type": "comment",
        "z": "64cc7bda.c3b164",
        "name": "Limit lesen",
        "info": "",
        "x": 80,
        "y": 260,
        "wires": []
    },
    {
        "id": "57c59d7a.f4d0e4",
        "type": "delay",
        "z": "64cc7bda.c3b164",
        "name": "3s",
        "pauseType": "delay",
        "timeout": "3",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 150,
        "y": 140,
        "wires": [
            [
                "13bdcf21.4f6a21"
            ]
        ]
    },
    {
        "id": "9c93af3d.df35c",
        "type": "link in",
        "z": "64cc7bda.c3b164",
        "name": "monit reload",
        "links": [
            "4685ff1c.60cba",
            "960d8179.d7bc7"
        ],
        "x": 55,
        "y": 140,
        "wires": [
            [
                "57c59d7a.f4d0e4"
            ]
        ]
    },
    {
        "id": "4685ff1c.60cba",
        "type": "link out",
        "z": "64cc7bda.c3b164",
        "name": "Limit setzen",
        "links": [
            "9c93af3d.df35c"
        ],
        "x": 1235,
        "y": 480,
        "wires": []
    },
    {
        "id": "4d76c005.4583e",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "msg.topic",
        "property": "topic",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "monit_reload",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "read_limit",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "set_limit",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 3,
        "x": 160,
        "y": 360,
        "wires": [
            [
                "960d8179.d7bc7"
            ],
            [
                "ad58530a.f110c",
                "716b1a80.7b1224"
            ],
            [
                "8ce57258.2116d"
            ]
        ]
    },
    {
        "id": "8ce57258.2116d",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "250&1500",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "btwn",
                "v": "250",
                "vt": "num",
                "v2": "1500",
                "v2t": "num"
            },
            {
                "t": "else"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 2,
        "x": 300,
        "y": 400,
        "wires": [
            [
                "c45365f3.d54c58"
            ],
            [
                "d2620c3e.a72e5"
            ]
        ]
    },
    {
        "id": "d2620c3e.a72e5",
        "type": "change",
        "z": "64cc7bda.c3b164",
        "name": "LIMIT",
        "rules": [
            {
                "t": "set",
                "p": "LIMIT",
                "pt": "msg",
                "to": "LIMIT",
                "tot": "env"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 450,
        "y": 420,
        "wires": [
            [
                "bc9f0ec8.b8e5b"
            ]
        ]
    },
    {
        "id": "c866a685.58e9a8",
        "type": "link in",
        "z": "64cc7bda.c3b164",
        "name": "STATUS",
        "links": [
            "500db73a.079148",
            "64340dbb.0fa7a4",
            "d85fd998.74c338",
            "d38cd1cc.9890a",
            "a5190d8d.e472b"
        ],
        "x": 1175,
        "y": 300,
        "wires": [
            []
        ]
    },
    {
        "id": "716b1a80.7b1224",
        "type": "function",
        "z": "64cc7bda.c3b164",
        "name": "hole",
        "func": "msg.payload = {fill:\"yellow\",shape:\"ring\",text: \"lese Ram Limit Wert aus...\"};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 790,
        "y": 360,
        "wires": [
            [
                "64340dbb.0fa7a4"
            ]
        ]
    },
    {
        "id": "64340dbb.0fa7a4",
        "type": "link out",
        "z": "64cc7bda.c3b164",
        "name": "STATUS",
        "links": [
            "c866a685.58e9a8"
        ],
        "x": 915,
        "y": 360,
        "wires": []
    },
    {
        "id": "a892137b.f18a",
        "type": "function",
        "z": "64cc7bda.c3b164",
        "name": "Ram",
        "func": "msg.payload = {fill:\"green\",shape:\"ring\",text:\"Ram: \" + msg.payload + \" MB\"};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 990,
        "y": 300,
        "wires": [
            [
                "500db73a.079148"
            ]
        ]
    },
    {
        "id": "500db73a.079148",
        "type": "link out",
        "z": "64cc7bda.c3b164",
        "name": "STATUS",
        "links": [
            "c866a685.58e9a8"
        ],
        "x": 1095,
        "y": 300,
        "wires": []
    },
    {
        "id": "a8da4c06.043ef",
        "type": "function",
        "z": "64cc7bda.c3b164",
        "name": "setze",
        "func": "msg.payload = {fill:\"yellow\",shape:\"ring\",text: \"setze auf \" + msg.LIMIT + \" MB Ram Limit\"};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 790,
        "y": 400,
        "wires": [
            [
                "64340dbb.0fa7a4"
            ]
        ]
    },
    {
        "id": "acbfc0c6.219ac",
        "type": "delay",
        "z": "64cc7bda.c3b164",
        "name": "2s",
        "pauseType": "delay",
        "timeout": "2",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 870,
        "y": 300,
        "wires": [
            [
                "a892137b.f18a"
            ]
        ]
    },
    {
        "id": "bdb51c6a.dcb31",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "cont",
                "v": "Reinitializing monit daemon",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 1,
        "x": 750,
        "y": 120,
        "wires": [
            [
                "f823b882.8efe18"
            ]
        ]
    },
    {
        "id": "6caca1ee.88049",
        "type": "delay",
        "z": "64cc7bda.c3b164",
        "name": "1s",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 990,
        "y": 100,
        "wires": [
            [
                "78d5e3dd.610d1c"
            ]
        ]
    },
    {
        "id": "78d5e3dd.610d1c",
        "type": "function",
        "z": "64cc7bda.c3b164",
        "name": "Ram",
        "func": "msg.payload = {fill:\"green\",shape:\"dot\",text:/*\"auf: \" + */msg.LIMIT + \" MB Ram Limit\"};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 1110,
        "y": 100,
        "wires": [
            [
                "d85fd998.74c338"
            ]
        ]
    },
    {
        "id": "d85fd998.74c338",
        "type": "link out",
        "z": "64cc7bda.c3b164",
        "name": "STATUS",
        "links": [
            "c866a685.58e9a8"
        ],
        "x": 1195,
        "y": 100,
        "wires": []
    },
    {
        "id": "cabea144.d219d8",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "",
        "property": "DEBUG",
        "propertyType": "env",
        "rules": [
            {
                "t": "true"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 1,
        "x": 910,
        "y": 260,
        "wires": [
            [
                "17b58bf3.e6bb24"
            ]
        ]
    },
    {
        "id": "b1652d8a.9944c",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "DEBUG",
        "property": "DEBUG",
        "propertyType": "env",
        "rules": [
            {
                "t": "true"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 1,
        "x": 760,
        "y": 60,
        "wires": [
            [
                "e7057033.13eea"
            ]
        ]
    },
    {
        "id": "ac924a11.a7e818",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "DEBUG",
        "property": "DEBUG",
        "propertyType": "env",
        "rules": [
            {
                "t": "true"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 1,
        "x": 760,
        "y": 220,
        "wires": [
            [
                "81764ab2.a63bf8"
            ]
        ]
    },
    {
        "id": "2b467f06.132fc",
        "type": "file in",
        "z": "64cc7bda.c3b164",
        "name": "",
        "filename": "/usr/local/addons/redmatic/etc/monit.cfg",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "x": 240,
        "y": 540,
        "wires": [
            [
                "136d9781.d24ec8"
            ]
        ]
    },
    {
        "id": "136d9781.d24ec8",
        "type": "function",
        "z": "64cc7bda.c3b164",
        "name": "",
        "func": "msg.payload = msg.payload.split(\"\\n\");\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 480,
        "y": 540,
        "wires": [
            [
                "1d39064b.08acaa"
            ]
        ]
    },
    {
        "id": "1d39064b.08acaa",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "if memory usage",
        "property": "payload[9]",
        "propertyType": "msg",
        "rules": [
            {
                "t": "cont",
                "v": "if memory usage",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 1,
        "x": 640,
        "y": 540,
        "wires": [
            [
                "94dbe335.8a0fc"
            ]
        ]
    },
    {
        "id": "94dbe335.8a0fc",
        "type": "function",
        "z": "64cc7bda.c3b164",
        "name": "read RAM",
        "func": "var antwort = msg.payload[9];\n\nvar RAM = antwort.slice(((antwort.indexOf('> ') + 3) - 1), antwort.lastIndexOf(' MB'));\nmsg.payload = parseFloat(RAM);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 800,
        "y": 540,
        "wires": [
            [
                "473c37fa.9211e8"
            ]
        ]
    },
    {
        "id": "c45365f3.d54c58",
        "type": "change",
        "z": "64cc7bda.c3b164",
        "name": "LIMIT",
        "rules": [
            {
                "t": "move",
                "p": "payload",
                "pt": "msg",
                "to": "LIMIT",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 450,
        "y": 380,
        "wires": [
            [
                "bc9f0ec8.b8e5b"
            ]
        ]
    },
    {
        "id": "bc9f0ec8.b8e5b",
        "type": "link out",
        "z": "64cc7bda.c3b164",
        "name": "",
        "links": [
            "ccd10c0e.6c433"
        ],
        "x": 555,
        "y": 400,
        "wires": []
    },
    {
        "id": "ccd10c0e.6c433",
        "type": "link in",
        "z": "64cc7bda.c3b164",
        "name": "",
        "links": [
            "bc9f0ec8.b8e5b"
        ],
        "x": 35,
        "y": 540,
        "wires": [
            [
                "2b467f06.132fc"
            ]
        ]
    },
    {
        "id": "473c37fa.9211e8",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "payload != LIMIT",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "neq",
                "v": "LIMIT",
                "vt": "msg"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 1,
        "x": 970,
        "y": 540,
        "wires": [
            [
                "a045cb0.726f538"
            ]
        ]
    },
    {
        "id": "8bbc0a24.47e958",
        "type": "link out",
        "z": "64cc7bda.c3b164",
        "name": "",
        "links": [
            "fe159720.cbf4f8"
        ],
        "x": 1235,
        "y": 540,
        "wires": []
    },
    {
        "id": "fe159720.cbf4f8",
        "type": "link in",
        "z": "64cc7bda.c3b164",
        "name": "",
        "links": [
            "8bbc0a24.47e958"
        ],
        "x": 675,
        "y": 440,
        "wires": [
            [
                "a8da4c06.043ef",
                "706cf3f6.eade9c"
            ]
        ]
    },
    {
        "id": "a045cb0.726f538",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "= Zahl",
        "property": "LIMIT",
        "propertyType": "msg",
        "rules": [
            {
                "t": "istype",
                "v": "number",
                "vt": "number"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 1,
        "x": 1130,
        "y": 540,
        "wires": [
            [
                "8bbc0a24.47e958"
            ]
        ]
    },
    {
        "id": "7eb84277.14805c",
        "type": "comment",
        "z": "64cc7bda.c3b164",
        "name": "Limit lesen",
        "info": "",
        "x": 80,
        "y": 500,
        "wires": []
    },
    {
        "id": "960d8179.d7bc7",
        "type": "link out",
        "z": "64cc7bda.c3b164",
        "name": "monit_reload",
        "links": [
            "3b5e290b.5ddf26",
            "9c93af3d.df35c"
        ],
        "x": 255,
        "y": 320,
        "wires": []
    },
    {
        "id": "3b5e290b.5ddf26",
        "type": "link in",
        "z": "64cc7bda.c3b164",
        "name": "monit reload",
        "links": [
            "960d8179.d7bc7"
        ],
        "x": 55,
        "y": 180,
        "wires": [
            [
                "431a30bc.5f51b"
            ]
        ]
    },
    {
        "id": "8f91fc2d.0340c",
        "type": "comment",
        "z": "64cc7bda.c3b164",
        "name": "monit reload",
        "info": "",
        "x": 90,
        "y": 100,
        "wires": []
    },
    {
        "id": "431a30bc.5f51b",
        "type": "function",
        "z": "64cc7bda.c3b164",
        "name": "hole",
        "func": "msg.payload = {fill:\"yellow\",shape:\"ring\",text: \"monit reload...\"};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 150,
        "y": 180,
        "wires": [
            [
                "d38cd1cc.9890a"
            ]
        ]
    },
    {
        "id": "d38cd1cc.9890a",
        "type": "link out",
        "z": "64cc7bda.c3b164",
        "name": "STATUS",
        "links": [
            "c866a685.58e9a8"
        ],
        "x": 275,
        "y": 180,
        "wires": []
    },
    {
        "id": "f823b882.8efe18",
        "type": "switch",
        "z": "64cc7bda.c3b164",
        "name": "",
        "property": "topic",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "set_limit",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "monit_reload",
                "vt": "str"
            }
        ],
        "checkall": "false",
        "repair": false,
        "outputs": 2,
        "x": 870,
        "y": 120,
        "wires": [
            [
                "6caca1ee.88049"
            ],
            [
                "8240fb31.628de8"
            ]
        ]
    },
    {
        "id": "8240fb31.628de8",
        "type": "delay",
        "z": "64cc7bda.c3b164",
        "name": "1s",
        "pauseType": "delay",
        "timeout": "1",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 990,
        "y": 140,
        "wires": [
            [
                "e19d0289.46152"
            ]
        ]
    },
    {
        "id": "e19d0289.46152",
        "type": "function",
        "z": "64cc7bda.c3b164",
        "name": "Ram",
        "func": "msg.payload = {fill:\"green\",shape:\"ring\",text:\" \"};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 1110,
        "y": 140,
        "wires": [
            [
                "a5190d8d.e472b"
            ]
        ]
    },
    {
        "id": "a5190d8d.e472b",
        "type": "link out",
        "z": "64cc7bda.c3b164",
        "name": "STATUS",
        "links": [
            "c866a685.58e9a8"
        ],
        "x": 1195,
        "y": 140,
        "wires": []
    },
    {
        "id": "8f8fb1f8.3035b",
        "type": "subflow:64cc7bda.c3b164",
        "z": "e053d1f8.10c2a",
        "name": "",
        "env": [
            {
                "name": "LIMIT",
                "value": "550",
                "type": "num"
            }
        ],
        "x": 550,
        "y": 3800,
        "wires": []
    },
    {
        "id": "8e77a569.45fec8",
        "type": "inject",
        "z": "e053d1f8.10c2a",
        "name": "read_limit",
        "props": [
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "read_limit",
        "payloadType": "str",
        "x": 320,
        "y": 3740,
        "wires": [
            [
                "8f8fb1f8.3035b"
            ]
        ]
    },
    {
        "id": "ad962959.2ee408",
        "type": "inject",
        "z": "e053d1f8.10c2a",
        "name": "set_limit 500",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "set_limit",
        "payload": "500",
        "payloadType": "num",
        "x": 310,
        "y": 3860,
        "wires": [
            [
                "8f8fb1f8.3035b"
            ]
        ]
    },
    {
        "id": "26a1640b.5b525c",
        "type": "inject",
        "z": "e053d1f8.10c2a",
        "name": "set_limit aus config",
        "props": [
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "set_limit",
        "payloadType": "str",
        "x": 290,
        "y": 3820,
        "wires": [
            [
                "8f8fb1f8.3035b"
            ]
        ]
    },
    {
        "id": "3b37aea9.08e8f2",
        "type": "inject",
        "z": "e053d1f8.10c2a",
        "name": "monit_reload",
        "props": [
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "monit_reload",
        "x": 310,
        "y": 3780,
        "wires": [
            [
                "8f8fb1f8.3035b"
            ]
        ]
    }
]
