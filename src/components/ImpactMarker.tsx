import { useMapEvents } from "react-leaflet";

interface ImpactMarkerProps {
  setImpactPoint: (point: [number, number]) => void;
}

const ImpactMarker = ({ setImpactPoint }: ImpactMarkerProps) => {
  useMapEvents({
    click(e) {
      setImpactPoint([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null; // No marker rendered until you click
};

export default ImpactMarker;
