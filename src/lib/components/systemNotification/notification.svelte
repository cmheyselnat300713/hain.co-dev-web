<script lang='ts'>
  import { notifs } from '$lib/stores/notificationStore'
  import { onDestroy, onMount } from 'svelte';

  export let notif = {
    msg: '',
    type: '',
    id: ''
  }

  let timer
  let timer2
  let remainingTime = 0

  const remove = () => {
    $notifs = $notifs.filter(notifa => notifa.id !== notif.id)
  }

  const start = (mlsec) => {
    remainingTime = mlsec
    timer2 = setInterval(() => {
      remainingTime--
    }, 1)
    timer = setTimeout(() => {
      $notifs = $notifs.filter(notifa => notifa.id !== notif.id)
    }, mlsec)
  }

  const pause = () => {
    clearInterval(timer2)
    clearInterval(timer)
  }

  onMount(() => {
    start(5000)
  })

  onDestroy(() => {
    clearInterval(timer)
  })

</script>

<div
  on:mouseenter={pause}
  on:mouseleave={e => start(remainingTime)}
  class="notification is-flex is-justify-content-space-between is-align-items-center mb-2 is-{notif.type === "success"? "success": notif.type === 'error' ? 'danger': 'warning'} is-light">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={remove} class="delete" />
  <div class="is-flex is-flex-direction-column">
    {notif.msg}
  </div>
</div>