import moment from 'moment'
import { component$, useClientEffect$, useStore, useStylesScoped$, $, useTask$ } from '@builder.io/qwik';
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import Box from '../../components/box/box'
import styles from './pz-clock.css?inline';

moment().format()

export default component$(() => {
  useStylesScoped$(styles);
  useLocation();

  const initialDate = new Date()
  const state = useStore({
    currentActualTime: initialDate,
    referenceActualTime: initialDate,
    referenceServerTime: '06:00',
    desiredServerTime: '06:00',
    projectedActualTime: undefined,
  });

  useClientEffect$(({ cleanup }) => {
    const internalHandle = setInterval(() => {
      state.currentActualTime = new Date()
    }, 1000);
    cleanup(() => clearInterval(internalHandle));
  });

  useTask$(({track}) => {
    const referenceActualTime = track(() => state.referenceActualTime)
    const referenceDuration = moment.duration(track(() => state.referenceServerTime)).asSeconds()
    const desiredDuration = moment.duration(track(() => state.desiredServerTime)).asSeconds()
    let deltaDurationSeconds = Math.max(referenceDuration, desiredDuration) - Math.min(referenceDuration, desiredDuration)
    deltaDurationSeconds = desiredDuration >= referenceDuration ? deltaDurationSeconds : moment.duration(24, 'hours').asSeconds() - deltaDurationSeconds
    const actualDurationDeltaSeconds = ( deltaDurationSeconds / (60 * 10)) * 90 // 10 in server minutes are 90 actual seconds
    // console.log(
    //   `server hours: ${moment.duration(deltaDurationSeconds, 'seconds').asHours()}`,
    //   `actual hours: ${moment.duration(actualDurationDeltaSeconds, 'seconds').asHours()}`,
    // )
    state.projectedActualTime = new Date(referenceActualTime[Symbol.toPrimitive]('number') + moment.duration(actualDurationDeltaSeconds, 'seconds').asMilliseconds())
  })

  const refresh = $(() => { state.referenceActualTime = state.currentActualTime });


  return (
    <>
      <Box title='Establish Time'>
        At <b>{state.referenceActualTime.toLocaleTimeString()}</b> <button onClick$={refresh}>r</button> server time is <input type="time" step="600" value={state.referenceServerTime} onInput$={(event) => state.referenceServerTime = event.target.value }/>
      </Box>
      <Box title='Desired Server Time'>
        To join at server time <input type="time" step="600" value={state.desiredServerTime} onInput$={(event) => state.desiredServerTime = event.target.value }/>
        <br />
        {state.projectedActualTime && (
          <div>
            Connect <b>{moment(state.referenceActualTime).to(moment(state.projectedActualTime))}</b> at <b>{state.projectedActualTime?.toLocaleTimeString()}</b> <button onClick$={() => console.log('set alarm')}>set alarm</button>
          </div>
        )}
      </Box>
      <Box title='Current Time/Alarms'>
        <div>{state.currentActualTime.toLocaleTimeString()}</div>
      </Box>
      <Box title='Debug' beginOpen={false}>
        <pre>
          {JSON.stringify(state, null, '\t')}
        </pre>
      </Box>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PZ Clock',
};
