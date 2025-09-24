import React, { useContext, useState } from "react";
import { FirebaseContext } from "@/App"; // adjust if your path differs
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button"; // or use your normal button
import { Download, Save } from "lucide-react";

export interface ImpactResult {
  asteroidDiameter: number;
  impactVelocity: number;
  impactAngle: number;
  targetCity: string;
  blastRadius?: number;
  casualties?: number;
  buildingsDestroyed?: number;
  tsunamiRisk?: boolean;
  [key: string]: any;
}

type Props = {
  results: ImpactResult;
  filename?: string;           // optional filename for downloads
  downloadAfterSave?: boolean; // if true, trigger download after saving in Firestore
};

const SaveResultsButton: React.FC<Props> = ({
  results,
  filename,
  downloadAfterSave = false,
}) => {
  const { db, auth } = useContext(FirebaseContext);
  const [busy, setBusy] = useState(false);

  const makeFilename = () =>
    filename ?? `impact-results-${results.targetCity ?? "scenario"}-${new Date().toISOString()}.json`;

  const downloadJSON = () => {
    try {
      const json = JSON.stringify(results, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = makeFilename();
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Could not create download.");
    }
  };

  const saveToFirestore = async () => {
    if (!auth || !auth.currentUser) {
      // not logged in: fallback to download (or you could show a login modal)
      const proceed = window.confirm("You are not signed in. Save locally (download) or sign in to store in your account?\nOK = Download, Cancel = Go to login");
      if (proceed) {
        downloadJSON();
      } else {
        // navigate to login - replace this if you use react-router's navigate
        window.location.href = "/auth";
      }
      return;
    }

    setBusy(true);
    try {
      await addDoc(collection(db, "impactResults"), {
        uid: auth.currentUser.uid,
        results,
        createdAt: serverTimestamp(),
      });
      // Use your app's toast system if available — fallback to alert:
      alert("Results saved to your account.");
      if (downloadAfterSave) downloadJSON();
    } catch (err: any) {
      console.error("Save failed:", err);
      alert("Failed to save results. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <Button onClick={saveToFirestore} disabled={busy}>
        {busy ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Results</>}
      </Button>

      {/* small extra: allow direct download */}
      <Button variant="ghost" className="ml-2" onClick={downloadJSON}>
        <Download className="mr-2 h-4 w-4" /> Download JSON
      </Button>
    </div>
  );
};

export default SaveResultsButton;
