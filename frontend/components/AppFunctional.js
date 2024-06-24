import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    const { x, y } = getXY();
    return `Koordinatlar (${x}, ${y})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setIndex(initialIndex);
    setSteps(initialSteps);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.

    let newIndex = index; // Mevcut indeksi kopyala

    // Yöne göre yeni indeksi hesapla
    if (yon === "sol" && newIndex % 3 !== 0) {
      newIndex -= 1; // Sol kenara ulaşmadıysa, sol bir indeks azalt
      setSteps(steps + 1);
    } else if (yon === "sağ" && (newIndex + 1) % 3 !== 0) {
      newIndex += 1; // Sağ kenara ulaşmadıysa, sağ bir indeks arttır
      setSteps(steps + 1);
    } else if (yon === "yukarı" && newIndex >= 3) {
      newIndex -= 3; // Üst kenara ulaşmadıysa, üst indekslerden birini azalt
      setSteps(steps + 1);
    } else if (yon === "aşağı" && newIndex < 6) {
      newIndex += 3; // Alt kenara ulaşmadıysa, alt indekslerden birini arttır
      setSteps(steps + 1);
    } else {
      setMessage("Bu yöne gidemezsiniz");
    }

    setIndex(newIndex); // Yeni indeksi güncelle
  }

  function ilerle(yon) {
    // Yeni indeksi hesapla ve güncelle
    sonrakiIndex(yon);
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault(); // Sayfanın yenilenmesini durdurur
    setMessage(email); // Email değerini kullanıcıya gösterir
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => ilerle("sol")}>
          SOL
        </button>
        <button id="up" onClick={() => ilerle("yukarı")}>
          YUKARI
        </button>
        <button id="right" onClick={() => ilerle("sağ")}>
          SAĞ
        </button>
        <button id="down" onClick={() => ilerle("aşağı")}>
          AŞAĞI
        </button>

        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
