import { Count } from 'components/Count'
import styles from 'styles/Home.module.css'
import { makeCounterActor } from 'ui/service/actor-locator'

function CountPage() {
    const counter = makeCounterActor()

    console.log(counter)
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Count actor={counter} />
            </main>
        </div>
    )
}

export default CountPage
