//@ts-nocheck
import React from "react";
function $tempkate(opts: any) {
  const { lang, dir, size, margin, css, page } = opts;
  return `<!DOCTYPE html><html lang="${lang}"dir="${dir}"><head><meta charset="UTF-8"/><meta http-equiv="X-UA-Compatible"content="IE=edge"/><meta name="viewport"content="width=device-width, initial-scale=1.0"/><style>@page{size:${size.page};margin:${margin}}#page{width:100%}#head{height:${size.head}}#foot{height:${size.foot}}</style>${css}</head><body><table id="page"><thead><tr><td><div id="head"></div></td></tr></thead><tbody><tr><td><main id="main">${page}</main></td></tr></tbody><tfoot><tr><td><div id=foot></div></td></tr></tfoot></table></body></html>`;
}

function Print(target: any) {
  const page = document.querySelector(target);

  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(
    $tempkate({
      size: {
        page: "A5",
        head: "100px",
        foot: "80px",
      },
      page: page.innerHTML,
      margin: "10mm 10mm 10mm 10mm",
      css: [
        '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">',
      ],
    })
  );
  iframeDoc.close();
  iframe.onload = function () {
    iframe.contentWindow.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
}
const PrintableComponant = () => {
  return (
    <>
      <button onClick={() => Print("#page")}>Print</button>
      <div className="w-full flex flex-col gap-4 bg-white rounded-sm p-4">
        <div className="w-full flex gap-4 items-start">
          <div className="flex-1 flex flex-col items-center">
            <h1>Dr. Aymen Botrma</h1>
            <h2>Doctor-Churirgien</h2>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-10 h-10 bg-red-500"></div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h1>Cabinet Zawamil</h1>
            <h2>Adresse: tabon fatima</h2>
            <h3>+XXX XXXX XXXX</h3>
          </div>
        </div>
        <div className="w-2/3 mx-auto flex flex-col gap-6">
          <div className="w-full flex gap-4 items-center flex-col">
            <h1 className="font-bold text-2xl text-blue-500 underline">
              Ordonance
            </h1>
            <p className="font-semibold">
              Fait a ............. Le ....../....../............
            </p>
            <p className="font-semibold">
              Nom & Prenom .....................................................
            </p>
          </div>
          <div className="w-full flex flex-col gap-4 my-10">
            <div className="w-full flex flex-col gap-2">
              <h3 className="font-bold">ajhd fdjhfd fdjhfd fdjh</h3>
              <p className="ms-4">dkjfkjd dfkjdf dfjhfd dfjhfd dfjhdf </p>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-2 items-center flex-col">
          <div className="w-1/3 h-1 bg-blue-500"></div>
          <p className="font-semibold">
            Tel: +XXX XXXX XXXX - +XXX XXXX XXXX _ Adresse: XXXXX XXXXX XXXXX
            XXXXX
          </p>
          <p className="font-semibold">XXXXX@XXXXX.XX</p>
        </div>
      </div>
      <div
        id="page"
        className="hidden w-full flex-col gap-4 bg-white rounded-sm"
      >
        <div className="fixed top-0 left-0 right-0 bg-white w-full flex gap-4 items-start">
          <div className="flex-1 flex flex-col items-center">
            <h1>Dr. Aymen Botrma</h1>
            <h2>Doctor-Churirgien</h2>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-10 h-10 bg-red-500"></div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h1>Cabinet Zawamil</h1>
            <h2>Adresse: tabon fatima</h2>
            <h3>+XXX XXXX XXXX</h3>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex gap-4 items-center flex-col">
            <h1 className="font-bold text-2xl text-blue-500 underline">
              Ordonance
            </h1>
            <p className="font-semibold">
              Fait a ............. Le ....../....../............
            </p>
            <p className="font-semibold">
              Nom & Prenom .....................................................
            </p>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <h3 className="font-bold">1. ajhd fdjhfd fdjhfd fdjh</h3>
              <p className="ml-4">dkjfkjd dfkjdf dfjhfd dfjhfd dfjhdf </p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-white w-full flex gap-2 items-center flex-col">
          <div className="w-1/3 h-1 bg-blue-500"></div>
          <p className="font-semibold">
            Tel: +XXX XXXX XXXX - +XXX XXXX XXXX _ Adresse: XXXXX XXXXX XXXXX
            XXXXX
          </p>
          <p className="font-semibold">XXXXX@XXXXX.XX</p>
        </div>
      </div>
    </>
  );
};

export default PrintableComponant;
