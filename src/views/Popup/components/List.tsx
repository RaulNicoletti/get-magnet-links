import { Suspense } from './Suspense';

interface Props {
  links: string[];
}

const List: React.FC<Props> = ({ links }) => {
  const getDisplayName = (link: string) => {
    const dn = link.match(/((?<=dn=)[^& ]*)/gmi);
    let displayName = 'Unkown name';

    if (dn) {
      try {
        displayName = decodeURI(dn[0]);
      } catch { }
    }

    return displayName;
  }

  const handleDownload = (link: string) => window.open(link);

  const Fallback = () => (
    <p>Nada por aqui</p>
  )

  const MapList = () => (
    <ul>
      {links.map((link) => {
        const displayName = getDisplayName(link);
        return (
          <li key={link}>
            <p>{displayName}</p>
            <button onClick={() => handleDownload(link)}>Download</button>
          </li>
        )
      }
      )}
    </ul>
  )

  return (
    <>
      <Suspense condition={links.length > 0} fallback={<Fallback />}>
        <MapList />
      </Suspense>
    </>
  )
}

export { List };
