const inputs = document.querySelectorAll('.controls input')

function handleControls () {
  // console.log(this.dataset)
  // console.log(this.name)
  // console.log(this.value+suffix)
  const suffix = this.dataset.sizing || '';
document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)

}

inputs.forEach(input => input.addEventListener('change', handleControls))
inputs.forEach(input => input.addEventListener('mousemove', handleControls))