import Box from '@mui/material/Box'
import ListColums from './Listcolumns/Listcolums'
import { useState, useEffect } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { cloneDeep } from 'lodash'

import { mapOrder } from '~/utils/sorts'
import Column from './Listcolumns/Column/Column'
import Card from './Listcolumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  //Cùng một thời điểm chỉ có một phần tử đang được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //Tìm một cái column theo cardId
  const findColumnByCardId = cardId => {
    /**
     *Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderId bởi vì ở bước handleDragOver chúng ta sẽ
     *làm dữ liệu cho card hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới
     **/
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  //Trigger khi bắt đầu kéo (drag) một phần tử
  const handleDragStart = event => {
    // console.log('handleDragStart: ', event)

    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
  }

  //Trigger trong quá trình kéo (drag) một phần tử
  const handleDragOver = event => {
    //Không làm gì nếu kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //Nếu kéo Card thì xử lý thêm
    // console.log('handleDragOver: ', event)
    const { active, over } = event

    //Nếu không tồn tại active/over (khi kéo thả ra khỏi phạm vi container) thì không làm gì
    if (!active || !over) return

    //activeDraggingCard: là cái card đang được kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    //overCard: là cái card đang được tương tác trên hoặc dưới so với cái card đang được kéo ở trên
    const { id: overCardId } = over

    //Tìm 2 cái column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    //Nếu không tồn tại 1 trong 2 column thì không làm gì
    if (!activeColumn || !overColumn) return

    //Xử lí logic khi kéo card qua 2 CLOUMN KHÁC NHAU
    //Đây chỉ là xử lí lúc kéo (handleDragOver), còn xử lí lúc kéo xong thì lại là vấn đề khác ở (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        //Tìm vị trí (Index) của overCard trong Column đích
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        //Logic tính toán cardIndex mới  (Trên hoặc dưới của overCard) lấy chuẩn ra từ code của thư viện
        let newCardIndex
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        //Clone mảng oderedColumns cũ ra một cái mới để xử lý data rồi return - cập nhật lại oderedColumns mới
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          //Xoá card ở column active
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        if (nextOverColumn) {
          //Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì xoá nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  //Trigger khi kết thúc kéo (drag) một phần tử => hành động thả (drop)
  const handleDragEnd = event => {
    // console.log('handleDragEnd: ', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Hành động kéo thả Card - Tạm thời không làm gì')
      return
    }

    const { active, over } = event

    //Nếu không tồn tại active/over (khi kéo thả ra khỏi phạm vi container) thì không làm gì
    if (!active || !over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumsIds = dndOrderedColumns.map(c => c._id)
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  // console.log('activeDragItemId:', activeDragItemId)
  // console.log('activeDragItemType:', activeDragItemType)
  // console.log('activeDragItemData:', activeDragItemData)

  // Animation khi thả (Drop) phần tử - Test bằng kéo xong thả trực tiếp và nhìn phần giữ chỗ overlay
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      collisionDetection={closestCorners}
      sensors={sensors}
    >
      <Box
        sx={{
          bgcolor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: theme => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColums columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
