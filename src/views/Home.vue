<template>
  <div>
    <div class="gap-2">
      <project-card 
        title="Remotely Control a Robotic Arm with Blockly"
        img="https://dogmatism.me/wp-content/uploads/2021/10/image-12.png" 
        :members="['Mr.Patipon Buason', 'Ms.Kuljira Jaruprathai']" 
        :buttons="[ 
          { 
            title: 'Play Game!', 
            url: 'roboticarm',
            requireAuth: true
          }, 
          { 
            title: 'Info',
            url: 'roboticarminfo',
            requireAuth: false
          }
        ]"
        body="โครงงานสื่อการเรียนรู้เพื่อควบคุมแขนกลทางไกลแบบปฏิสัมพันธ์ด้วย Blockly ชิ้นนี้จัดทำขึ้นโดยมีวัตถุประสงค์เพื่อเสริมสร้างความเข้าใจในการทำงานของระบบ IOT และส่งเสริมการเรียนรู้ทางด้านวิทยาการหุ่นยนต์ในระดับเบื้องต้น โดยมีความเป็นเป็นมิตรต่อตัวผู้เรียนจากระบบการสั่งงานแขนกลแบบปฏิสัมพันธ์ผ่าน Blockly และยังสามารถสังเกตการณ์ผลการสั่งงานผ่านระบบ Video Streaming แบบ Real-Time วิธีการเล่น 1.กดที่แท็บกล่องคำสั่งฝั่งซ้ายมือโดยเริ่มต้นจากบล็อกที่ชื่อว่า Start ก่อนเสมอ 2.เลือกบล็อกคำสั่งอื่นๆที่ต้องการเพื่อนำมาต่อภายในบล็อก Start 3.หากต้องการลบบล็อกที่ไม่ต้องการใช้ทิ้งให้ทำการลากไปวางในไอคอนรูปพังขยะ 4.เมื่อสิ้นสุดการต่อบล็อกแล้วให้ทำการต่อบล็อก End เป็นบล็อกสุดท้ายแล้วจึงกดปุ่ม Submit 5.สังเกตการทำงานของหุ่นยนต์ที่หน้า Video Streaming"
        class="pt-3"
        >
      </project-card>
      <project-card 
        title="Augmented Maze Challenge"
        img="https://i.imgur.com/St7Ksog.jpeg" 
        :members="['Mr.Thanatchai Wongjirad', 'Mr.Nattapoom Sawettaporn']" 
        :buttons="[ 
          { 
            title: 'Info',
            url: 'augmentinfo',
            requireAuth: false
          }
        ]"
        body="เกมบังคับหุ่นยนต์ระยะไกลฝ่าเขาวงกตจำลองหากท่านกำลังสนใจการเขียนโปรแกรม แต่ยังไม่เข้าใจหลักการของมัน Augment Maze Challenge ก็ดูจะเป็นสื่อการเรียนรู้ที่เหมาะในการเปิดประสบการณ์เหล่านั้นให้แก่ท่าน ผ่านการเรียง block coding ที่เข้าใจง่าย เพื่อบังคับหุ่นยนต์ระยะไกล (teleoperation) ให้วิ่งผ่านเขาวงกตจำลองที่ซ้อนทับอยู่บนสนามจริง ไปยังจุดหมายปลายทางที่กำหนดให้ โดยไม่ให้จุดวงกลมบนตัวหุ่นยนต์โดนกำแพงเขาวงกตแม้แต่น้อย หากโดนเกมจะยุติและตัวหุ่นยนต์จะวิ่งกลับไป ณ จุดเริ่มต้นอีกครั้งเพื่อให้ผู้เล่นเริ่มใหม่ ลองดูสิว่า ท่านสามารถพิชิตเกมนี้ได้หรือไม่!"
        class="pt-3"
        >
      </project-card>
      <project-card 
        title="Logistic Robot"
        img="https://i.imgur.com/5RMoaqu.jpeg" 
        :members="['Mr.Teerapord Lin', 'Mr.Pattaraphon Boonchai']" 
        :buttons="[ 
          { 
            title: 'Play Game!',
            url: 'logiticrobotgame',
            requireAuth: true
          },
          { 
            title: 'Info',
            url: 'logiticrobotinfo',
            requireAuth: false
          }
        ]"
        body="โครงการ Logistic Robot ใช้ระบบ IoT ในการสื่อสารระหว่างอุปกรณ์ เพื่อปฏิบัติตามภารกิจที่มอบหมายให้โดยจะให้ Logistic Robot วิ่งตามเส้นหยิบขวดน้ำจากจุดหนึ่งไปวางยังอีกจุดหนึ่ง โดยจะมี ขวดน้ำ และ bucket จับกันเป็นคู่ ๆวางอยู่ในตำแหน่งต่าง ๆตามจุดตัดทางวิ่งของหุ่นยนต์เพื่อให้นำไปวางให้ตรงคู่ของกันและกัน"
        class="pt-3"
        >
      </project-card>
      <project-card 
        title="Node-RED to the moon "
        img="https://i.imgur.com/D3r85iZ.jpeg" 
        :members="['Mr.Phisek Phinyothammakon']" 
        :buttons="[ 
          { 
            title: 'Info',
            url: 'noderedinfo',
            requireAuth: false
          }
        ]"
        body="โครงงานสื่อการเรียนรู้เพื่อสอนการใช้งาน Node-RED ผ่าน Node-RED Dashboard โดยมีหัวข้อดังนี้ Node-RED Dashboard, Node-RED Communication with PLC via Modbus TCP/IP, Node-RED: MQTT Protocol, Node-RED: Line Notify"
        class="pt-3"
        >
      </project-card>
    </div>
  </div>
</template>
<script>
import ProjectCard from "../components/ProjectCard.vue"

export default {
  data() {
    return { }
  },
  components: {
    ProjectCard
  }
}
</script>
