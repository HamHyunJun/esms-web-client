<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <strong>{{caption}}</strong>
      </slot>
    </CCardHeader>
    <CCardBody style="padding: 0.25rem;">
      <CDataTable
          class="mb-0 table-clear thHidden"
          hover
          :items="tableItems"
          :fields="tableFields"
          head-color="light"
          margin-bottom="0rem"
          style="border: 0;"
          sorting
      >
        <td slot="user" slot-scope="{item}">
          <div>{{item.user.name}}</div>
          <div class="small text-muted">
                  <span>
                    <template v-if="item.user.new">New</template>
                    <template v-else>Recurring</template>
                  </span> | Registered: {{item.user.registered}}
          </div>
        </td>
        <td slot="activity" slot-scope="{item}">
          <strong>{{item.activity}}</strong>
        </td>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'RecentSocialWorker',
  data () {
    return {
      caption: "최근 응급 이벤트",
      tableItems: [
        {
          user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
          activity: '10 sec ago'
        },
        {
          user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
          activity: '5 minutes ago'
        },
        {
          user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
          activity: '1 hour ago'
        },
        {
          user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015' },
          activity: 'Last month'
        },
        {
          user: { name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015' },
          activity: 'Last week'
        }
      ],
      tableFields: [
        { key: 'user', label: '', display: 'none' },
        { key: 'activity', label: '', display: 'none' },
      ]
    }
  },
}
</script>
