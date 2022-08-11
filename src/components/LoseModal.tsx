interface Props {
  onClose: () => void;
}

function LoseModal({ onClose }: Props) {
  return (
    <div>
      <div className="mt-2">
        Maaf, tebakan kamu kurang tepat, terima kasih telah bermain bersama, mari
        main di lain hari dengan soal yang baru.
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={onClose}
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}

export default LoseModal;
