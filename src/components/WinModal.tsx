import dayjs from 'dayjs';

interface Props {
  onClose: () => void;
  startTime?: Date;
  stopTime?: Date;
  chances: number;
}

function WinModal({ onClose, startTime, stopTime, chances }: Props) {
  const diffSec = dayjs(stopTime).diff(startTime, 's');

  const timeMessage = `⏱ ${Math.floor(diffSec / 60)} menit, ${diffSec} detik`;
  const chanceMessage = `Sisa kesempatan: ${chances}`;
  const template = {
    text: `Saya berhasil menyelesaikan soal hari ini di #TebakKataSilang ${timeMessage} dan ${chanceMessage}, mainkan di ${window.location.href} - @sadevva_`,
  };
  const url = new URL('https://twitter.com/intent/tweet');
  url.search = new URLSearchParams(template).toString();

  return (
    <div>
      <div className="mt-2 flex flex-col gap-4">
        <p>
          Selamat, Kamu berhasil menebak seluruh kata yang ada dalam waktu{' '}
          <span>{timeMessage}</span>{' '}
        </p>
        <p>
          Bagikan hasil ini ke twitter, dan mari kembali esok hari untuk soal
          yang lebih menantang.
        </p>
      </div>

      <div className="mt-4 flex gap-2 justify-end">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
          onClick={onClose}
        >
          Mengerti
        </button>
        <a href={url.toString()}>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            onClick={onClose}
          >
            Tweet
          </button>
        </a>
      </div>
    </div>
  );
}

export default WinModal;
