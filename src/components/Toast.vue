<template>
    <div></div> <!-- Este componente no necesita template -->
  </template>
  
<script>
import { ref } from 'vue';
import Swal from 'sweetalert2';

export default function useToast() {
  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 3000,
      animation: true,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  };

  return {
    showToast
  };
}
</script>