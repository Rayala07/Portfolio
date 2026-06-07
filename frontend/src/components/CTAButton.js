import styles from './CTAButton.module.css'

/* Outlined CTA button — href for destination, label for display text */
export default function CTAButton({ href, label }) {
  return (
    <a href={href} className={styles.button}>
      {label}
    </a>
  )
}
