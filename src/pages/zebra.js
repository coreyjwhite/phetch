import { useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import Button from "components/input/Button";
import Page from "components/layout/Page";

export default function Zebra() {
  const [barcode, setBarcode] = useState("waiting...");

  // choose your media device (webcam, frontal camera, back camera, etc.)

  // you can use the controls to stop() the scan or switchTorch() if available

  const codeReader = new BrowserMultiFormatReader();
  const result = codeReader
    .decodeOnceFromVideoDevice(undefined, "video")
    .then(result => setBarcode(result.text))
    .catch(err => console.error(err));

  return (
    <Page>
      <video autoPlay id="video" width="500" height="400"></video>
      <div>
        <Button>Reset</Button>
      </div>
      <p>{barcode}</p>
    </Page>
  );
}
/*
window.addEventListener("load", function() {
  let selectedDeviceId;
  const codeReader = new BrowserMultiFormatReader();
  codeReader
    .listVideoInputDevices()
    .then(videoInputDevices => {
      const sourceSelect = document.getElementById("sourceSelect");
      selectedDeviceId = videoInputDevices[0].deviceId;
      if (videoInputDevices.length >= 1) {
        videoInputDevices.forEach(element => {
          const sourceOption = document.createElement("option");
          sourceOption.text = element.label;
          sourceOption.value = element.deviceId;
          sourceSelect.appendChild(sourceOption);
        });

        sourceSelect.onchange = () => {
          selectedDeviceId = sourceSelect.value;
        };

        const sourceSelectPanel = document.getElementById("sourceSelectPanel");
        sourceSelectPanel.style.display = "block";
      }

      document.getElementById("startButton").addEventListener("click", () => {
        codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          "video",
          (result, err) => {
            if (result) {
              console.log(result);
              document.getElementById("result").textContent = result.text;
            }
            if (err && !(err instanceof ZXing.NotFoundException)) {
              console.error(err);
              document.getElementById("result").textContent = err;
            }
          }
        );
        console.log(
          `Started continous decode from camera with id ${selectedDeviceId}`
        );
      });

      document.getElementById("resetButton").addEventListener("click", () => {
        codeReader.reset();
        document.getElementById("result").textContent = "";
        console.log("Reset.");
      });
    })
    .catch(err => {
      console.error(err);
    });
});
*/
