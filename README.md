# Redmatic Ramlimit ändern

`Version 1.0.0`

---
## Beispiel:

https://github.com/Matten-Matten/redmatic-RAM-Limit-Subflow/blob/master/Subflow

![picture](https://raw.githubusercontent.com/Matten-Matten/redmatic-RAM-Limit-Subflow/master/RAM%20Limit.png)
![picture](https://raw.githubusercontent.com/Matten-Matten/redmatic-RAM-Limit-Subflow/master/RAM%20Limit%20conf.png)

---
## Wert holen
`msg.topic = "read_limit"`

`msg.payload = egal`


---

## Wert schreiben
`msg.topic = "set_limit"`

`msg.payload = 250-1500 (Zahl)`


---
## monit reload
`msg.topic = "monit_reload"`

`msg.payload = egal`

---

_by Matten Matten_
