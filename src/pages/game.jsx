import FinalAnswerPopup from "@/components/finish";
import OceanScene from "@/components/OceanScene";
function Game() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <OceanScene />
            <FinalAnswerPopup />
        </main>
    );
}

export default Game;
