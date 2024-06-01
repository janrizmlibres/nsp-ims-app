import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'

export const useUtilitiesStore = defineStore('utilities', () => {
  const terms = ref([])
  const strands = ref([])
  const visibleAddStrandDialog = ref(false)
  const requirements = ref([])
  const visibleAddRequirementDialog = ref(false)
  const categories = ref([])
  const visibleAddCategoryDialog = ref(false)

  // for Academic Term Creation Operations
  async function addTerm(dates) {
    const authStore = useAuthStore()

    await axios.post('http://localhost:8080/api/v1/utilities/term/create', dates, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    await addAudit(`Added: New Academic Term`)
  }

  async function getTerms() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/api/v1/utilities/terms', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    terms.value = result.data.data
  }

  async function updateTerm(termId, form) {
    const authStore = useAuthStore()

    await axios.patch(`http://localhost:8080/api/v1/utilities/term/${termId}/update`, form, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    await addAudit(`Updated: Academic Term with ID: ${termId}`)
  }

  // for Learning Strands Creation Operations
  async function addLearningStrand(strands) {
    const authStore = useAuthStore()

    await axios.post('http://localhost:8080/api/v1/utilities/strand/create', strands, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    await addAudit(`Added: New Learning Strand`)
  }

  async function getLearningStrands() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/api/v1/utilities/strands', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
    
    strands.value = result.data.data
  }

  function showHideAddStrandDialog() {
    visibleAddStrandDialog.value = !visibleAddStrandDialog.value
  }

  async function updateLearningStrand(strandId, form) {
    const authStore = useAuthStore()

    await axios.patch(`http://localhost:8080/api/v1/utilities/strand/${strandId}/update`, form, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    await addAudit(`Updated: Learning Strand with ID: ${strandId}`)
  }

  async function deleteLearningStrand(strandId) {
    const authStore = useAuthStore()

    await axios.delete(`http://localhost:8080/api/v1/utilities/strand/${strandId}/delete`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    await addAudit(`Deleted: Learning Strand with ID: ${strandId}`)
  }

  // for Student Requirements Creation Operations
  async function addRequirement(requirement) {
    const authStore = useAuthStore()

    await axios.post('http://localhost:8080/api/v1/utilities/requirement/create', requirement, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    await addAudit(`Added: New Student Requirement`)
  }

  async function getRequirements() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/api/v1/utilities/requirements', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
    console.log(result.data.data)
    requirements.value = result.data.data
  }

  function showHideAddRequirementDialog() {
    visibleAddRequirementDialog.value = !visibleAddRequirementDialog.value
  }

  async function updateRequirement(requirementId, form) {
    const authStore = useAuthStore()

    await axios.patch(
      `http://localhost:8080/api/v1/utilities/requirement/${requirementId}/update`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    await addAudit(`Updated: Student Requirement with ID: ${requirementId}`)
  }

  async function deleteRequirement(requirementId) {
    const authStore = useAuthStore()

    await axios.delete(
      `http://localhost:8080/api/v1/utilities/requirement/${requirementId}/delete`,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    await addAudit(`Deleted: Student Requirement with ID: ${requirementId}`)
  }

  // for Student Categories Creation Operations
  async function addCategory(category) {
    const authStore = useAuthStore()

    await axios.post('http://localhost:8080/api/v1/utilities/category/create', category, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    await addAudit(`Added: New Student Category`)
  }

  async function getCategories() {
    const authStore = useAuthStore()

    const result = await axios.get('http://localhost:8080/api/v1/utilities/categories', {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    categories.value = result.data.data
  }

  function showHideAddCategoryDialog() {
    visibleAddCategoryDialog.value = !visibleAddCategoryDialog.value
  }

  async function updateCategory(categoryId, form) {
    const authStore = useAuthStore()

    await axios.patch(
      `http://localhost:8080/api/v1/utilities/category/${categoryId}/update`,
      form,
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    await addAudit(`Updated: Student Category with ID: ${categoryId}`)
  }

  async function deleteCategory(categoryId) {
    const authStore = useAuthStore()

    await axios.delete(`http://localhost:8080/api/v1/utilities/category/${categoryId}/delete`, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })
  }

  async function addAudit(description) {
    const authStore = useAuthStore()

    const result = await axios.post(
      `http://localhost:8080/api/v1/admin/user/add-audit`,
      {
        userId: authStore.user.id,
        description,
        date: new Date()
      },
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )
    return result
  }

  return {
    terms,
    addTerm,
    getTerms,
    updateTerm,
    strands,
    visibleAddStrandDialog,
    addLearningStrand,
    getLearningStrands,
    showHideAddStrandDialog,
    updateLearningStrand,
    deleteLearningStrand,
    requirements,
    visibleAddRequirementDialog,
    addRequirement,
    getRequirements,
    showHideAddRequirementDialog,
    updateRequirement,
    deleteRequirement,
    categories,
    visibleAddCategoryDialog,
    addCategory,
    getCategories,
    showHideAddCategoryDialog,
    updateCategory,
    deleteCategory,
    addAudit
  }
})
