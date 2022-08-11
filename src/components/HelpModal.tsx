import BaseModal from './BaseModal';

interface Props {
  onClose: () => void;
}

function HelpModal({ onClose }: Props) {
  return (
    <div>
      <div className="mt-2">
        <ul className="flex flex-col gap-3">
          <li className="text-sm text-gray-500">
            Tekan atau click tombol karakter yang tersedia di board game untuk
            menebak jawaban dari teka-teki
          </li>
          <li className="text-sm text-gray-500">
            Pastikan Kamu menjawab dengan tepat karena hanya ada 3 kali
            kesempatan menebak
          </li>
          <li className="text-sm text-gray-500">
            Kamu dinyatakan menang bila telah berhasil menebak seluruh kata yang
            ada
          </li>
          <li className="text-sm text-gray-500">
            Kamu akan dinyatakan kalah bila telah kesempatan menebak telah habis
          </li>
        </ul>
      </div>

      <div className="mt-4 flex flex-end">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={onClose}
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}

export default HelpModal;
