import { useDebounce } from '../../../hooks/useDebounce'
import { useScroll } from '../../../hooks/useScroll'
import { Search as SearchIcon } from '../../../icons/Search'
import { useStore } from '../../../store/useStore'
import { AppLogo } from '../../root/AppLogo/AppLogo'
import './browseHeader.css'

export function BrowseHeader () {
  const { scrolledUp } = useScroll()
  const debouncedScrolledUp = useDebounce(scrolledUp, 75)
  const browsePageInputIsVisible = useStore(state => state.browsePageInputIsVisible)
  const transitioning = useStore(state => state.transitioning)

  const className = (scrolledUp && debouncedScrolledUp) && !browsePageInputIsVisible
    ? 'browse-header visible'
    : 'browse-header hidden'

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <AppLogo />
      <header className={className}>
        <AppLogo />
        <button
          className='search-btn'
          onClick={handleClick}
          disabled={transitioning}
        >
          <SearchIcon />
        </button>
      </header>
    </>
  )
}
