import styles from './status-page.module.css'

/** Shared layout for the 404 and error pages: a huge code, one line, and a way back. */
export function StatusPage({
  code,
  title,
  text,
  children
}: {
  code: string
  title: string
  text: string
  children: React.ReactNode
}) {
  return (
    <section className={`${styles.page} wrap`}>
      <p className={styles.code} aria-hidden="true">
        {code}
      </p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      <div className={styles.acts}>{children}</div>
    </section>
  )
}
