import { Foto } from "../gemeinsam";

const ViewerOffnen = function (e: Event, Foto: Foto) {
  e.preventDefault();
  document.dispatchEvent(new CustomEvent("Viewer_offnen", {
    detail: Foto
  }));
};

export {
  ViewerOffnen,
};